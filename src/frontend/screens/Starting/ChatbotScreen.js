import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const ChatbotScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Chat Widget</title>
              <script type="text/javascript">
                  (function(d, m){
                      var kommunicateSettings = 
                          {"appId":"21da1dade4b17e791260e1efe7149c43d","popupWidget":true,"automaticChatOpenOnNavigation":true};
                      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
                      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
                      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
                      window.kommunicate = m; m._globals = kommunicateSettings;
                  })(document, window.kommunicate || {});
              </script>
          </head>
          <body>
          </body>
          </html>`,
        }}
        style={styles.webView}
      />
      
      {/* Bouton centré en bas */}
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.buttonText}>Back to Start</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  webView: {
    flex: 1,
    width: '100%',
    paddingBottom: 50, // Espace ajouté pour que le bouton ne soit pas caché
  },
  buttonContainer: {
    position: 'absolute', // Permet de positionner le bouton dans le footer
    bottom: 20, // Positionné à 20px du bas
    left: 0,
    right: 0,
    justifyContent: 'center', // Centre le bouton horizontalement
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#FF4081',
    paddingVertical: 10, // Réduit la hauteur du bouton
    paddingHorizontal: 25, // Ajuste la largeur du bouton
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14, // Réduit la taille du texte
    fontWeight: '600',
  },
});

export default ChatbotScreen;
