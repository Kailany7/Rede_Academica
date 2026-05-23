import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native'

import Colors from '../../../constants/Colors'
import FloatingChat from '../../../components/FloatingChat'
import Header from '../../../components/Header'


// Botão central customizado
function CustomAddButton({
  onPress
}: {
  onPress: () => void
}) {
  return (

    <View style={styles.addButtonContainer}>

      <TouchableOpacity
        style={styles.addButton}
        onPress={onPress}
        activeOpacity={0.9}
      >

        {/* Círculo branco interno */}
        <View style={styles.innerCircle}>

          <Ionicons
            name="add"
            size={30}
            color="#0A4174"
          />

        </View>

      </TouchableOpacity>

    </View>
  )
}

export default function TabsLayout() {

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Tabs

        screenOptions={{

          headerShown: false,

          tabBarActiveTintColor: Colors.primary,

          tabBarInactiveTintColor:
            Colors.mutedForeground,

          tabBarStyle: {

            backgroundColor: Colors.card,

            borderTopColor: Colors.border,

            height: 60,

            paddingBottom: 8,
          },

          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
        }}
      >


        {/* FEED */}
        <Tabs.Screen
          name="feed"

          options={{

            title: 'Início',

            tabBarIcon: ({
              color,
              size
            }) => (

              <Ionicons
                name="home-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />



        {/* BUSCA */}
        <Tabs.Screen
          name="busca"

          options={{

            title: 'Buscar',

            tabBarIcon: ({
              color,
              size
            }) => (

              <Ionicons
                name="search-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* CRIAR PUBLICAÇÃO */}
        <Tabs.Screen
          name="criar-publicacao"

          options={{

            title: '',

            tabBarLabel: '',

            tabBarButton: (props) => (

              <CustomAddButton
                onPress={
                  props.onPress as () => void
                }
              />
            ),
          }}
        />

        {/* REDE DE CONEXÕES */}
        <Tabs.Screen
          name="rede-conexoes"

          options={{

            title: 'Conexões',

            tabBarIcon: ({
              color,
              size
            }) => (

              <Ionicons
                name="people-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* VAGAS */}

        <Tabs.Screen
          name="vagas"
          options={{
            title: 'Vagas',

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="briefcase-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* PERFIL */}
        <Tabs.Screen
          name="perfil"

          options={{

            title: 'Perfil',

            tabBarIcon: ({
              color,
              size
            }) => (

              <Ionicons
                name="person-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="grupos"
          options={{
            title: 'Grupos',
            tabBarButton: () => null,

          }}
        />

        {/* BOTÃO FLUTUANTE */}
        <FloatingChat />
      </Tabs>


    </View>
  )
}

const styles = StyleSheet.create({

  // Container botão +
  addButtonContainer: {

    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',
  },

  // Botão azul externo
  addButton: {

    width: 72,

    height: 72,

    borderRadius: 36,

    backgroundColor: '#0A4174',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 28,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.18,

    shadowRadius: 8,

    elevation: 8,
  },

  // Círculo branco interno
  innerCircle: {

    width: 54,

    height: 54,

    borderRadius: 27,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',
  },
})
