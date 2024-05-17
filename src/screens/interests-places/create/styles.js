import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  formContainer: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
  },

  logo: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 50,
  },

  textInput: {
    borderColor: "#000000",
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  error: {
    textAlign: "center",
    color: "red",
    fontSize: 12,
    marginBottom: 0,
  },
});
