import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  Controller,
  Control,
  RegisterOptions,
  FieldName,
} from "react-hook-form";
import { TextInput, Text } from "react-native-paper";
import { FormType } from "./Form";

type Props = {
  control: Control<FormType>;
  label: keyof FormType;
  rules?: RegisterOptions;
  placeholder?: string;
  secureTextEntry?: boolean;
  clearErrors: (name: FieldName<FormType> | FieldName<FormType>[]) => void;
  error?: string;
  inputContainerStyle?: StyleProp<ViewStyle>;
};

export const Input = ({
  control,
  label,
  rules,
  placeholder,
  secureTextEntry,
  clearErrors,
  error,
  inputContainerStyle,
}: Props) => {
  return (
    <View style={inputContainerStyle}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={label.charAt(0).toUpperCase() + label.slice(1)}
            mode="outlined"
            placeholder={placeholder}
            onChangeText={(text: string) => {
              error && clearErrors(label);
              onChange(text);
            }}
            onBlur={onBlur}
            value={value}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={label}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: { color: "red", fontSize: 10, fontStyle: "italic" },
});
