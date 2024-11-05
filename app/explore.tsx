import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function TabTwoScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View />; // Permisos cargando
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Permiso para usar la cámara necesario
        </Text>
        <Button title="Otorgar permiso" onPress={requestPermission} />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert("Código Escaneado", `Tipo: ${type}, Datos: ${data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr", "ean13"] }}
      />
      <View style={styles.overlay}>
        <View style={styles.scanFrame} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Cambiar Cámara</Text>
        </TouchableOpacity>
        {scanned && (
          <Button title="Escanear de nuevo" onPress={() => setScanned(false)} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  buttonContainer: { position: "absolute", bottom: 20, alignSelf: "center" },
  button: { backgroundColor: "#fff", padding: 10, borderRadius: 5 },
  text: { color: "#000", fontSize: 16 },
});
