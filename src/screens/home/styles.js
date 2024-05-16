import { StyleSheet } from "react-native";
import { AppColors } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    paddingBottom: 80,
  },

  logo: {
    width: "100%",
    height: 250,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "white",
  },

  button: {
    flex: 1,
    alignItems: "center", // Center children horizontally
    backgroundColor: AppColors.secondary,
    margin: 10,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    paddingVertical: 20,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
