import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import {
  TouchableOpacity,
  View
} from 'react-native'

export default function TabsLayout() {

  return (

    <Tabs>

      {/* FEED */}
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
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

          // Remove texto
          tabBarLabel: '',

          // Botão customizado
          tabBarButton: (props: any) => (

            <TouchableOpacity
              {...props}
              activeOpacity={0.9}

              style={{
                top: -22,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >

              {/* Círculo azul externo */}
              <View
                style={{
                  width: 72,
                  height: 72,

                  borderRadius: 36,

                  backgroundColor: '#0A4174',

                  justifyContent: 'center',
                  alignItems: 'center',

                  // Sombra
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },

                  shadowOpacity: 0.18,
                  shadowRadius: 8,

                  elevation: 8,
                }}
              >

                {/* Círculo branco interno */}
                <View
                  style={{
                    width: 54,
                    height: 54,

                    borderRadius: 27,

                    backgroundColor: '#FFFFFF',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >

                  {/* Ícone + */}
                  <Ionicons
                    name="add"
                    size={30}
                    color="#0A4174"
                  />

                </View>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      {/* PERFIL */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  )
}