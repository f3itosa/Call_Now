import PushNotification from "react-native-push-notification"




class NotificationManager {

   /* setNavegador(novoNavegador){
        navegador = novoNavegador
    }

    // Configuração orientada pela documentação do React Native Push Notification
    // Essa configuração garante o funcionamento da biblioteca no Android e no iOS
    configure = () => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[NotificationManager] onRegister token:", token);
            },
            onNotification: function (notification) {
                console.log("[NotificationManager] onNotification:", notification);
                navegador.navigate("Lista")


            },
        })
    }*/

    // É aqui que nossa notificação para o Android é construida
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data
        }
    }

    // Fução que exibe a notificação
    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Propriedades do Android */
            ...this.buildAndroidNotification(id, title, message, data, options),

            /* Propriedades do Android e iOS */
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            channelId: "channel-id",
            userInteraction: false
        })
    }

    // Função que cancela todas notiificações e limpa as que estão no centro de notificações
    cancelAllLocalNotification = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    // criacao de canais
    createChannel = () => {
        PushNotification.createChannel(
            {
                channelId: "channel-id", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                //playSound: false, // (optional) default: true
                //soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                //importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                //vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.

        )
    }

    agendarNotificacoes = () => {
          PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            id:2,
            title:"Abra novos chamados 🗓",
            channelId: "channel-id",
            message: "Agendar preventiva 🔍", // (required)
            date: new Date(Date.now() + 15 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
          
            /* Android Only Properties */
            repeatTime: 20 * 1000, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
            repeatType: "time"
          });
          PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            id:3,
            title:"Chamados em aberto ⚠",
            channelId: "channel-id",
            message: "Usuário aguardando atendimento técnico...", // (required)
            date: new Date(Date.now() + 25 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
          
            /* Android Only Properties */
            repeatTime: 30 * 1000, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
            repeatType: "time"
          });
          
    
    }

}

export const Notification = new NotificationManager();