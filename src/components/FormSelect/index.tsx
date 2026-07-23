import Ionicons from "@expo/vector-icons/Ionicons";
import { Bank } from "@/app/Type/types";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useBankDatabase } from "@/database/useBankDatabase";
import { colors } from "@/theme/colors";
import { useEffect, useMemo, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

interface FormSelectParams<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}

export const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Selecione",
}: FormSelectParams<T>) => {
  const bankDatabase = useBankDatabase();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const filteredBanks = useMemo(() => {
    const query = normalize(search);

    if (!query) {
      return banks;
    }

    return banks.filter((bank) => {
      const bankName = normalize(bank.name);
      const bankCode = normalize(bank.code);

      return bankName.includes(query) || bankCode.includes(query);
    });
  }, [banks, search]);

  async function fetchBanks() {
    try {
      setIsLoading(true);
      const response = await bankDatabase.listBanks();
      setBanks(response);
    } catch (error) {
      console.error("Error fetching banks:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function openSelect() {
    setSearch("");
    setIsOpen(true);
  }

  function getSelectedLabel(value: string) {
    const selectedBank = banks.find((bank) => bank.code === value);

    return selectedBank?.name || value || placeholder;
  }

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.input}
            onPress={openSelect}
          >
            <Text
              numberOfLines={1}
              style={[styles.selectedText, !value && styles.placeholder]}
            >
              {getSelectedLabel(value)}
            </Text>
            <Ionicons
              name={isOpen ? "chevron-up" : "chevron-down"}
              color={colors.visibilityPassword}
              size={22}
            />
          </TouchableOpacity>

          {error && <ErrorMessage>{error.message}</ErrorMessage>}

          <Modal
            animationType="fade"
            transparent
            visible={isOpen}
            onRequestClose={() => setIsOpen(false)}
          >
            <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
              <View
                style={styles.dropdown}
                onStartShouldSetResponder={() => true}
              >
                <View style={styles.searchContainer}>
                  <Ionicons
                    name="search"
                    color={colors.text.placeholder}
                    size={20}
                  />
                  <TextInput
                    autoFocus
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar banco"
                    placeholderTextColor={colors.text.placeholder}
                    style={styles.searchInput}
                  />
                </View>

                {isLoading ? (
                  <View style={styles.feedback}>
                    <ActivityIndicator color="#AED9DA" />
                  </View>
                ) : (
                  <FlatList
                    data={filteredBanks}
                    keyExtractor={(item) => String(item.id || item.code)}
                    keyboardShouldPersistTaps="handled"
                    style={styles.list}
                    ListEmptyComponent={
                      <Text style={styles.emptyText}>
                        Nenhum banco encontrado.
                      </Text>
                    }
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.option}
                        onPress={() => {
                          onChange(item.code);
                          setIsOpen(false);
                        }}
                      >
                        <Text style={styles.optionName} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text style={styles.optionCode}>{item.code}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </Pressable>
          </Modal>
        </View>
      )}
    />
  );
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}
