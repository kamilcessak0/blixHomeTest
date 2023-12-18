import { useState } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { IconButton, Checkbox, Text, Button } from "react-native-paper";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export type FormType = {
  userName: string;
  password: string;
  serverAddress: string;
  serverPath: string;
  port: number;
  sslEnabled?: boolean;
};

export const Form = () => {
  const [accountType, setSccountType] = useState<"manual" | "advanced">(
    "manual"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm<FormType>();

  const { mainContainer, customInputContainer, formContainer, pickerStyle } =
    styles;
  const ssl = watch("sslEnabled");

  const onSubmit = (data) => {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== null) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    const payload = { ...filteredData, accountType };
    ssl && Object.assign(payload, ssl);
    console.log("Submitted data from form: ", payload);
    let message = "";
    Object.entries(payload).map(
      (e) =>
        (message += `${e[0].charAt(0).toUpperCase() + e[0].slice(1)}: ${
          e[1]
        }\n`)
    );
    alert(message);
  };

  return (
    <SafeAreaView style={mainContainer}>
      <ScrollView contentContainerStyle={formContainer}>
        <Text>{"Simple form by Kamil Cessak :)"}</Text>
        <RNPickerSelect
          onValueChange={(value) => setSccountType(value)}
          value={accountType}
          items={[
            {
              label: "Account Type: Advanced",
              key: "advanced-item",
              value: "advanced",
            },
            {
              label: "Account Type: Manual",
              key: "manual-item",
              value: "manual",
            },
          ]}
          style={{
            inputIOS: pickerStyle,
            inputAndroid: pickerStyle,
          }}
          Icon={() => <IconButton icon="chevron-down" />}
        />
        <Input
          label="userName"
          control={control}
          clearErrors={clearErrors}
          placeholder="name@example.com"
          rules={{
            required: "User name is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "This field must contain email address",
            },
          }}
          error={errors?.userName?.message}
        />
        <Input
          label="password"
          control={control}
          clearErrors={clearErrors}
          placeholder="Required"
          secureTextEntry
          rules={{ required: "Password is required" }}
          error={errors?.password?.message}
        />
        <Input
          label="serverAddress"
          control={control}
          clearErrors={clearErrors}
          placeholder="example.com"
          rules={{
            required: "Server address is required",
            pattern: {
              value: /^www..+..+$/,
              message: "Incorrect server address format",
            },
          }}
          error={errors?.serverAddress?.message}
        />
        {accountType === "advanced" && (
          <Input
            label="serverPath"
            control={control}
            clearErrors={clearErrors}
            placeholder="/calendars/user/"
            rules={{
              required: "Server path is required",
              pattern: {
                value: /^[a-zA-Z0-9/]*$/,
                message: "Incorrect server path",
              },
            }}
            error={errors?.serverPath?.message}
          />
        )}
        {accountType === "advanced" && (
          <View style={customInputContainer}>
            <Input
              label="port"
              control={control}
              clearErrors={clearErrors}
              rules={{
                required: "Port is required",
                pattern: {
                  value: /^(?:[0-9]|[1-9][0-9]{1,2})$/,
                  message: "Only numbers are allowed",
                },
              }}
              error={errors?.port?.message}
              inputContainerStyle={{ width: "30%" }}
            />
            <View style={customInputContainer}>
              <Checkbox.Android
                status={ssl ? "checked" : "unchecked"}
                onPress={() => setValue("sslEnabled", !ssl)}
              />
              <Text>{"Use SSL"}</Text>
            </View>
          </View>
        )}
        <Button mode="outlined" onPress={handleSubmit(onSubmit)}>
          <Text>{"Submit"}</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pickerStyle: {
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    padding: 16,
  },
  customInputContainer: { flexDirection: "row", alignItems: "center" },
  formContainer: { padding: 16, gap: 16 },
  mainContainer: {
    flex: 1,
    width: "100%",
  },
});
