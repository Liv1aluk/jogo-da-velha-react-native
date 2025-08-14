import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  StatusBar,
  Dimensions,
  Animated,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

const logoFontSize = Math.min(width * 0.12, 72);
const buttonSize = Math.min(width * 0.5, 300);
const sairFontSize = Math.min(width * 0.06, 24);
const regrasFontSize = Math.min(width * 0.05, 22);

const ticTacToeImageUrl = "https://i.imgur.com/39sQ2rC.png";

export default function Home() {
  const router = useRouter();

  // --- ANIMAÇÕES ---
  const logoAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animação de Entrada
  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(logoAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(footerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const handlePressAnimation = (animValue, toValue) => {
    Animated.timing(animValue, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const sairScale = useRef(new Animated.Value(1)).current;
  const regrasScale = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: ticTacToeImageUrl }}
        resizeMode="cover"
        style={styles.backgroundImage}
        tintColor="#37123C"
        imageStyle={styles.imageOpacity}
      />
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: logoAnim,
              transform: [
                {
                  translateY: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.logo}>JOGO DA VELHA</Text>
        </Animated.View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        <Animated.View
          style={{ opacity: buttonAnim, transform: [{ scale: buttonAnim }] }}
        >
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={styles.jogarBtn}
              onPress={() => router.push("/jogo")}
              activeOpacity={0.9}
            >
              <Text style={styles.jogarTexto}>JOGAR</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        <Animated.View style={[styles.inferior, { opacity: footerAnim }]}>
          <Pressable
            onPressIn={() => handlePressAnimation(sairScale, 0.9)}
            onPressOut={() => handlePressAnimation(sairScale, 1)}
            onPress={() => BackHandler.exitApp()}
          >
            <Animated.View style={{ transform: [{ scale: sairScale }] }}>
              <Text style={styles.sairTexto}>Sair</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPressIn={() => handlePressAnimation(regrasScale, 0.9)}
            onPressOut={() => handlePressAnimation(regrasScale, 1)}
            onPress={() => router.push("/regras")}
          >
            <Animated.View
              style={[
                styles.regrasBtn,
                { transform: [{ scale: regrasScale }] },
              ]}
            >
              <Text style={styles.regrasTexto}>Regras</Text>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20063B",
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  imageOpacity: {
    opacity: 0.05,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(32, 6, 59, 0.5)",
    width: "100%",
    maxWidth: 1000,
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
  },
  logo: {
    fontSize: logoFontSize,
    fontWeight: "bold",
    color: "#D8DCFF",
    textAlign: "center",
    textShadowColor: "#CC3363",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
  },
  dividerContainer: {
    width: "80%",
    alignItems: "center",
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: "#37123C",
    shadowColor: "#AEADF0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  jogarBtn: {
    backgroundColor: "#37123C",
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#AEADF0",
    shadowColor: "#CC3363",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  jogarTexto: {
    color: "#D8DCFF",
    fontSize: buttonSize * 0.2,
    fontWeight: "bold",
    textShadowColor: "#D8DCFF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  inferior: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sairTexto: {
    fontSize: sairFontSize,
    color: "#AEADF0",
    fontWeight: "500",
  },
  regrasBtn: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#AEADF0",
  },
  regrasTexto: {
    fontSize: regrasFontSize,
    fontWeight: "bold",
    color: "#AEADF0",
  },
});
