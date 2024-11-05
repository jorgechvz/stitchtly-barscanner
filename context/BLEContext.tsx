// BLEContext.tsx
import React, { createContext, useMemo, useState } from "react";
import { BleManager, Device } from "react-native-ble-plx";

interface BLEContextProps {
  bleManager: BleManager;
  connectedDevice: Device | null;
  setConnectedDevice: React.Dispatch<React.SetStateAction<Device | null>>;
}

export const BLEContext = createContext<BLEContextProps | undefined>(undefined);

export const BLEProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const bleManager = useMemo(() => new BleManager(), []);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  return (
    <BLEContext.Provider
      value={{ bleManager, connectedDevice, setConnectedDevice }}
    >
      {children}
    </BLEContext.Provider>
  );
};
