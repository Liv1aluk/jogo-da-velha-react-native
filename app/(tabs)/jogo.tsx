import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const boardSize = width * 0.8;
const cellSize = boardSize / 3;
const markSize = cellSize * 0.8;

type Jogador = "X" | "O";
type Tabuleiro = (Jogador | null)[];

export default function Jogo() {
  const [tabuleiro, setTabuleiro] = useState<Tabuleiro>(Array(9).fill(null));
  const [jogadorAtual, setJogadorAtual] = useState<Jogador>("O");
  const [placar, setPlacar] = useState<Record<Jogador, number>>({ X: 0, O: 0 });
  const router = useRouter();

  const animacaoO = useRef(new Animated.Value(1)).current;
  const animacaoX = useRef(new Animated.Value(0.4)).current;
  const zerarPlacarScale = useRef(new Animated.Value(1)).current;
  const zerarTabuleiroScale = useRef(new Animated.Value(1)).current;

  const verificarVencedor = (quadrados: Tabuleiro): Jogador | null => {
    const combinacoes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < combinacoes.length; i++) {
      const [a, b, c] = combinacoes[i];
      if (
        quadrados[a] &&
        quadrados[a] === quadrados[b] &&
        quadrados[a] === quadrados[c]
      ) {
        return quadrados[a];
      }
    }
    return null;
  };
  const jogar = (index: number) => {
    if (tabuleiro[index] || verificarVencedor(tabuleiro)) return;
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[index] = jogadorAtual;
    setTabuleiro(novoTabuleiro);
    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  };
  useEffect(() => {
    const vencedor = verificarVencedor(tabuleiro);
    if (vencedor) {
      Alert.alert("Fim da Rodada!", `O jogador ${vencedor} venceu!`);
      const novoPlacar = { ...placar, [vencedor]: placar[vencedor] + 1 };
      setPlacar(novoPlacar);
      if (Math.abs(novoPlacar.X - novoPlacar.O) >= 3) {
        setTimeout(() => {
          router.push({
            pathname: "/vitoria",
            params: {
              winner: vencedor,
              scoreX: novoPlacar.X,
              scoreO: novoPlacar.O,
            },
          });

          resetarPlacar();
        }, 1000);

        return;
      }
      setTimeout(() => resetarTabuleiro(), 1000);
    } else if (!tabuleiro.includes(null)) {
      setTimeout(() => resetarTabuleiro(), 2000);
    }
  }, [tabuleiro]);
  useEffect(() => {
    const duration = 200;
    if (jogadorAtual === "O") {
      Animated.timing(animacaoO, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
      Animated.timing(animacaoX, {
        toValue: 0.4,
        duration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animacaoX, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
      Animated.timing(animacaoO, {
        toValue: 0.4,
        duration,
        useNativeDriver: true,
      }).start();
    }
  }, [jogadorAtual]);
  const resetarTabuleiro = () => {
    setTabuleiro(Array(9).fill(null));
    setJogadorAtual("O");
  };
  const resetarPlacar = () => {
    setPlacar({ X: 0, O: 0 });
    resetarTabuleiro();
  };

  const handlePressAnimation = (animValue, toValue) => {
    Animated.timing(animValue, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const renderCelula = (index: number) => {
    const valor = tabuleiro[index];
    return (
      <TouchableOpacity
        key={index}
        style={styles.celula}
        onPress={() => jogar(index)}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.marca, valor === "X" ? styles.marcaX : styles.marcaO]}
        >
          {valor}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.placar}>
          <View style={styles.placarColuna}>
            <Text style={styles.placarNumero}>{placar.X}</Text>
            <Text style={styles.placarSimboloX}>X</Text>
          </View>
          <View style={styles.placarDivisor} />
          <View style={styles.placarColuna}>
            <Text style={styles.placarNumero}>{placar.O}</Text>
            <Text style={styles.placarSimboloO}>O</Text>
          </View>
        </View>
      </View>
      <View style={styles.tabuleiroContainer}>
        <View style={styles.tabuleiro}>
          <View style={styles.linha}>
            {renderCelula(0)}
            {renderCelula(1)}
            {renderCelula(2)}
          </View>
          <View style={styles.linha}>
            {renderCelula(3)}
            {renderCelula(4)}
            {renderCelula(5)}
          </View>
          <View style={styles.linha}>
            {renderCelula(6)}
            {renderCelula(7)}
            {renderCelula(8)}
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.vezTexto}>TURNO DO JOGADOR</Text>
        <View style={styles.vezContainer}>
          <Animated.View style={{ opacity: animacaoX }}>
            <Text style={styles.vezSimboloX}>X</Text>
          </Animated.View>
          <View style={styles.vezDivisor} />
          <Animated.View style={{ opacity: animacaoO }}>
            <Text style={styles.vezSimboloO}>O</Text>
          </Animated.View>
        </View>
        <View style={styles.botoesContainer}>
          <Pressable
            onPressIn={() => handlePressAnimation(zerarPlacarScale, 0.95)}
            onPressOut={() => handlePressAnimation(zerarPlacarScale, 1)}
            onPress={resetarPlacar}
          >
            <Animated.View
              style={[
                styles.botao,
                { transform: [{ scale: zerarPlacarScale }] },
              ]}
            >
              <Text style={styles.botaoTexto}>ZERAR PLACAR</Text>
            </Animated.View>
          </Pressable>
          <Pressable
            onPressIn={() => handlePressAnimation(zerarTabuleiroScale, 0.95)}
            onPressOut={() => handlePressAnimation(zerarTabuleiroScale, 1)}
            onPress={resetarTabuleiro}
          >
            <Animated.View
              style={[
                styles.botao,
                { transform: [{ scale: zerarTabuleiroScale }] },
              ]}
            >
              <Text style={styles.botaoTexto}>ZERAR TABULEIRO</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B24",
    padding: 15,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    marginBottom: 40,
  },
  voltarTexto: { fontSize: width * 0.07, color: "#E4CC37", fontWeight: "bold" },
  placar: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4CC37",
  },
  placarColuna: { alignItems: "center", minWidth: width * 0.1 },
  placarNumero: { fontSize: width * 0.08, color: "white", fontWeight: "bold" },
  placarSimboloX: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#B80C09",
  },
  placarSimboloO: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#30BCED",
  },
  placarDivisor: {
    width: 1,
    height: "80%",
    backgroundColor: "#E4CC37",
    marginHorizontal: 10,
  },
  tabuleiroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabuleiro: { width: boardSize, height: boardSize },
  linha: { flexDirection: "row" },
  celula: {
    width: cellSize,
    height: cellSize,
    borderWidth: 2,
    borderColor: "#0072BB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30, 145, 214, 0.1)",
  },
  marca: { fontSize: markSize, fontWeight: "bold" },
  marcaX: {
    color: "#B80C09",
    textShadowColor: "rgba(184, 12, 9, 1)",
    textShadowRadius: 20,
  },
  marcaO: {
    color: "#30BCED",
    textShadowColor: "rgba(48, 188, 237, 1)",
    textShadowRadius: 20,
  },
  footer: { alignItems: "center", width: "100%", paddingBottom: 10 },
  vezTexto: {
    fontSize: width * 0.05,
    color: "#E4CC37",
    marginBottom: 10,
    fontWeight: "bold",
    letterSpacing: 2,
    paddingTop: 35,
  },
  vezContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    width: "95%",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4CC37",
  },
  vezSimboloX: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: "#B80C09",
    textShadowColor: "rgba(184, 12, 9, 1)",
    textShadowRadius: 25,
  },
  vezSimboloO: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: "#30BCED",
    textShadowColor: "rgba(48, 188, 237, 1)",
    textShadowRadius: 25,
  },
  vezDivisor: { width: 2, height: "80%", backgroundColor: "#E4CC37" },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  botao: {
    backgroundColor: "#E18335",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#E18335",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  botaoTexto: { color: "#070B24", fontSize: width * 0.035, fontWeight: "bold" },
});
