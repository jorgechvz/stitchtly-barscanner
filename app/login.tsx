import React from "react";
import { View, Text, TextInput, Image, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginType } from "@/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { loginMutation } = useAuth();
  const navigation = useNavigation();
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: LoginType) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigation.navigate("barcode" as never);
      }
    });
    form.reset();
  };

  return (
    <View className="flex-1 justify-center bg-gray-50 px-6">
      <View className="items-center mb-6">
        <Image
          source={require("@/assets/images/stitchly-logo2.png")}
          className="w-20 h-20"
        />
      </View>
      <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
        Sign in to your
      </Text>
      <Text className="text-3xl font-bold text-gray-800 text-center mb-6">
        Account
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-8">
        Enter your email and password to log in
      </Text>
      <View className="flex-row items-center border border-gray-300 rounded-lg p-3 mb-4">
        <Controller
          control={form.control}
          name={"email"}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Email"
                className="flex-1 text-base"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FontAwesome name="envelope" size={20} color="#9ca3af" />
            </>
          )}
        />
      </View>
      {form.formState.errors.email && (
        <Text className="text-red-500 text-xs mb-4 px-3">
          {form.formState.errors.email.message}
        </Text>
      )}
      <View className="flex-row items-center border border-gray-300 rounded-lg p-3 mb-4">
        <Controller
          control={form.control}
          name={"password"}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Password"
                className="flex-1 text-base"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FontAwesome name="lock" size={20} color="#9ca3af" />
            </>
          )}
        />
      </View>
      {form.formState.errors.password && (
        <Text className="text-red-500 text-xs mb-4 px-3">
          {form.formState.errors.password.message}
        </Text>
      )}
      <Pressable
        className="w-full bg-primary rounded-xl py-3 flex flex-row items-center px-8 justify-center"
        onPress={form.handleSubmit(onSubmit)}
      >
        <Text className="text-white text-lg font-bold ">Log in</Text>
      </Pressable>

      <Text className="text-center text-gray-500 mt-4">
        Don't have an account?{" "}
        <Text className="text-primary text-center">Contact us</Text>
      </Text>
    </View>
  );
}
