import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");
const scoreCircleSize = width * 0.55;
const titleFontSize = width * 0.1;

export default function Vitoria() {
  const router = useRouter();

  const { winner, scoreX, scoreO } = useLocalSearchParams();

  const winnerScore = winner === "X" ? scoreX : scoreO;
  const loserScore = winner === "X" ? scoreO : scoreX;

  const contentAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressAnimation = (animValue, toValue) => {
    Animated.timing(animValue, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const jogarNovamenteScale = useRef(new Animated.Value(1)).current;
  const regrasScale = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View style={[styles.header, { opacity: contentAnim }]}>
        <Pressable onPress={() => router.replace("/")}>
          <Text style={styles.sairTexto}>Sair</Text>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[
          styles.mainContent,
          {
            opacity: contentAnim,
            transform: [
              {
                translateY: contentAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.title}>JOGO DA VELHA</Text>
        <Text style={styles.winnerText}>Você venceu {winner} !!</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>
            {winnerScore} / {loserScore}
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.inferior, { opacity: footerAnim }]}>
        <Pressable
          onPressIn={() => handlePressAnimation(jogarNovamenteScale, 0.95)}
          onPressOut={() => handlePressAnimation(jogarNovamenteScale, 1)}
          onPress={() => router.replace("/jogo")}
        >
          <Animated.View
            style={{ transform: [{ scale: jogarNovamenteScale }] }}
          >
            <Text style={styles.jogarNovamenteTexto}>Jogar novamente</Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPressIn={() => handlePressAnimation(regrasScale, 0.95)}
          onPressOut={() => handlePressAnimation(regrasScale, 1)}
          onPress={() => router.push("/regras")}
        >
          <Animated.View
            style={[styles.regrasBtn, { transform: [{ scale: regrasScale }] }]}
          >
            <Text style={styles.regrasTexto}>Regras</Text>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1128",
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    alignItems: "flex-start",
    paddingTop: 20,
  },
  sairTexto: {
    fontSize: width * 0.06,
    color: "#FEFCFB",
    fontWeight: "500",
  },
  mainContent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingBottom: "20%",
  },
  title: {
    fontSize: titleFontSize,
    fontWeight: "bold",
    color: "#FEFCFB",
    textAlign: "center",
    opacity: 0.8,
  },
  winnerText: {
    fontSize: width * 0.07,
    color: "#1282A2",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
    textShadowColor: "#1282A2",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  scoreCircle: {
    width: scoreCircleSize,
    height: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    backgroundColor: "#001F54",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#034078",
    shadowColor: "#1282A2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },
  scoreText: {
    fontSize: scoreCircleSize * 0.3,
    color: "#FEFCFB",
    fontWeight: "bold",
    fontFamily: "serif",
  },
  inferior: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  jogarNovamenteTexto: {
    fontSize: width * 0.06,
    color: "#FEFCFB",
    fontWeight: "bold",
    fontFamily: "serif",
  },
  regrasBtn: {
    backgroundColor: "rgba(254, 252, 251, 0.1)",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#034078",
  },
  regrasTexto: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#FEFCFB",
  },
});
