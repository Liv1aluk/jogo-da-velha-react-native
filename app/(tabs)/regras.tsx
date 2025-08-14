import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useRef } from "react";

const { width } = Dimensions.get("window");
const titleFontSize = width * 0.09;
const subtitleFontSize = width * 0.055;
const ruleFontSize = width * 0.04;
const arrowSize = width * 0.07;

const regrasEFuncionamento = [
  "Cada jogador escolhe uma marcação, geralmente um círculo (O) ou um xis (X).",
  "Os jogadores jogam alternadamente, uma marcação por vez, numa lacuna que esteja vazia.",
  "O objetivo é conseguir três círculos ou três xis em linha, quer horizontal, vertical ou diagonal.",
  "O objetivo final é conseguir uma diferença de 3 vitorias para vencer a partida.",
  "//SUBTÍTULO//",
  "Funcionamento da Interface",
  "**O Tabuleiro:** A grade 3x3 no centro é o campo de jogo.",
  "**O Placar:** Mostra a pontuação atual da partida no canto superior direito.",
  "**Indicador de Vez:** Informa qual jogador deve fazer a próxima jogada.",
  "**Contagem de Pontos:** Você ganha um ponto ao conseguir alinhar três símbolos.",
];

export default function Regras() {
  const router = useRouter();

  const backButtonScale = useRef(new Animated.Value(1)).current;
  const handlePressAnimation = (toValue) => {
    Animated.timing(backButtonScale, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.mainPanel}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Regras Jogo da Velha</Text>

          {regrasEFuncionamento.map((item, index) => {
            if (regrasEFuncionamento[index - 1] === "//SUBTÍTULO//") {
              return (
                <Text key={index} style={styles.subtitle}>
                  {item}
                </Text>
              );
            }
            if (item === "//SUBTÍTULO//") return null;
            if (item.startsWith("**")) {
              return (
                <Text key={index} style={styles.ruleText}>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.split("**")[1]}
                  </Text>
                  {item.split("**")[2]}
                </Text>
              );
            }
            return (
              <Text key={index} style={styles.ruleText}>
                {item}
              </Text>
            );
          })}
        </ScrollView>
        <View style={styles.arrow} />
      </View>

      <View style={styles.backButtonContainer}>
        <Pressable
          onPressIn={() => handlePressAnimation(0.95)}
          onPressOut={() => handlePressAnimation(1)}
          onPress={() => router.back()}
        >
          <Animated.View
            style={[
              styles.backButton,
              { transform: [{ scale: backButtonScale }] },
            ]}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20063B",
    justifyContent: "center",
    padding: 20,
  },
  mainPanel: {
    backgroundColor: "rgba(216, 220, 255, 0.85)",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#AEADF0",
    padding: 25,
    shadowColor: "#CC3363",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 15,
    maxHeight: "80%",
    marginBottom: 80,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: titleFontSize,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#37123C",
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: subtitleFontSize,
    fontWeight: "bold",
    color: "#CC3363",
    marginTop: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(55, 18, 60, 0.3)",
    paddingBottom: 5,
  },
  ruleText: {
    fontSize: ruleFontSize,
    color: "#20063B",
    lineHeight: ruleFontSize * 1.6,
    marginBottom: 15,
  },
  arrow: {
    position: "absolute",
    right: -arrowSize,
    bottom: 25,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: arrowSize,
    borderBottomWidth: arrowSize,
    borderLeftWidth: arrowSize,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "rgba(216, 220, 255, 0.85)",
  },
  backButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#AEADF0",
  },
  backButtonText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#AEADF0",
    letterSpacing: 1,
    fontFamily: "serif",
  },
});
