import React, { FC, useCallback, useMemo } from "react"
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native"
import { Device } from "react-native-ble-plx"
import { BluetoothIcon, SignalIcon } from "lucide-react-native"
import { Button } from "@/~/components/ui/button"

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>
  connectToPeripheral: (device: Device) => void
  closeModal: () => void
}

type DeviceModalProps = {
  devices: Device[]
  visible: boolean
  connectToPeripheral: (device: Device) => void
  closeModal: () => void
}

const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {
  const { item, connectToPeripheral, closeModal } = props

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item)
    closeModal()
  }, [closeModal, connectToPeripheral, item.item])

  const signalStrength = useMemo(() => {
    const rssi = item.item.rssi || -100
    if (rssi > -60) return 3
    if (rssi > -70) return 2
    return 1
  }, [item.item.rssi])

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      style={styles.deviceItem}
    >
      <View style={styles.deviceInfo}>
        <BluetoothIcon size={24} color="#10B981" />
        <View style={styles.deviceDetails}>
          <Text style={styles.deviceName}>{item.item.name || "Unknown Device"}</Text>
          <Text style={styles.deviceId}>{item.item.id}</Text>
        </View>
      </View>
      <View style={styles.deviceStatus}>
        <SignalIcon size={16} color={signalStrength > 2 ? "#10B981" : signalStrength > 1 ? "#FBBF24" : "#EF4444"} />
      </View>
    </TouchableOpacity>
  )
}

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      )
    },
    [closeModal, connectToPeripheral]
  )

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View className="flex-1 bg-white mt-10">
        <Text className="text-3xl font-bold text-primary text-center mb-5">Available Devices</Text>
        <FlatList
          data={devices}
          renderItem={renderDeviceModalListItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.deviceList}
        />
        <Button className="m-6 rounded-2xl py-3" onPress={closeModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  deviceList: {
    paddingHorizontal: 20,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceDetails: {
    marginLeft: 12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  deviceId: {
    fontSize: 12,
    color: '#6B7280',
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default DeviceModal