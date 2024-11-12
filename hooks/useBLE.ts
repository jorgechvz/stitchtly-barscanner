import { useContext, useState, useMemo } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { Device } from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";
import base64 from "react-native-base64";
import { BLEContext } from "@/context/BLEContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ESP32_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const ESP32_CHARACTERISTIC = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (device: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  writeData: (data: string) => Promise<void>;
}

function useBLE(): BluetoothLowEnergyApi {
  const context = useContext(BLEContext);

  if (!context) {
    throw new Error("useBLE must be used within a BLEProvider");
  }

  const { bleManager, connectedDevice, setConnectedDevice } = context;
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const deviceIds = useMemo(() => new Set<string>(), []);

  const isDuplicateDevice = (id: string) => deviceIds.has(id);

  const requestAndroid31Permissions = async (): Promise<boolean> => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
      bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
      fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
    );
  };

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }

      if (device && device.name && !isDuplicateDevice(device.id)) {
        deviceIds.add(device.id);
        setAllDevices((prevState) => [...prevState, device]);
      }
    });
  };

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      await AsyncStorage.setItem("device_connected", "true");
    } catch (error) {
      console.log("FAILED TO CONNECT", error);
    }
  };

  const disconnectFromDevice = async () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      await AsyncStorage.removeItem("device_connected");
    }
  };

  /*   const onDataUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {
    if (error) {
      console.log("Error en la actualización de datos:", error);
      return;
    }
    if (!characteristic?.value) {
      console.log("No se recibieron datos");
      return;
    }
    const rawData = base64.decode(characteristic.value);
    console.log("Datos recibidos del dispositivo:", rawData);
  }; */

  const writeData = async (data: string) => {
    if (connectedDevice) {
      try {
        const base64Data = base64.encode(data);
        await bleManager.writeCharacteristicWithResponseForDevice(
          connectedDevice.id,
          ESP32_UUID,
          ESP32_CHARACTERISTIC,
          base64Data
        );
      } catch (error) {
        console.log("Error to write data", error);
      }
    } else {
      console.log("Any device is not connected");
    }
  };

  return {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice,
    allDevices,
    writeData,
  };
}

export default useBLE;
