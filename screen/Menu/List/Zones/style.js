import { StyleSheet , Dimensions } from "react-native";

const Styles= StyleSheet.create({
    container:{

    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height+200,
      },
});

export default Styles;