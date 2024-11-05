import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import base64 from 'react-native-base64';
import DeviceModal from '@/components/device/DeviceConnectionModal';
import useBLE from '@/hooks/useBLE';

const Device: React.FC = () => {
  const navigation = useNavigation();
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    writeData,
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const sendDataToESP32 = () => {
    const dataToSend = 'Hola desde la app!';
    const base64Data = base64.encode(dataToSend);
    writeData(base64Data);
  };

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  useEffect(() => {
    if (connectedDevice) {
      navigation.navigate('barcode' as never);
    }
  }, [connectedDevice, navigation]);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    await scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f2f2f2]">
      <View className="flex-1 justify-center items-center">
        {connectedDevice ? (
          <Text className="text-2xl font-bold text-black text-center mx-5">
            This is a test to send data to ESP32
          </Text>
        ) : (
          <Text className="text-2xl font-bold text-black text-center mx-5">
            Please Connect to a ESP32 Device
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        className="bg-[#FF6060] justify-center items-center h-12 mx-5 mb-1 rounded-lg"
      >
        <Text className="text-lg font-bold text-white">
          {connectedDevice ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
      {connectedDevice && (
        <TouchableOpacity
          onPress={sendDataToESP32}
          className="bg-[#28a745] justify-center items-center h-12 mx-5 my-2 rounded-lg"
        >
          <Text className="text-lg font-bold text-white">
            Enviar Datos al ESP32
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Device;
