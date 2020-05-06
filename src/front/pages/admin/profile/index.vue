<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app color="green"
      dark
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Статистика</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Мои заказы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="green"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Личный кабинет</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <!--
      <v-container>
        <v-row align="start"
          justify="center">
          <v-col class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-6">
            <div class="information__name title">
              Имя:
            </div>
          </v-col>
          <v-col class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-6">
            <div class="information__name__value title">
            Иван
            </div>
          </v-col>
           <v-col class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-6">
            <div class="information__surname title">
              Фамилия:
            </div>
          </v-col>
          <v-col class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-xs-6">
            <div class="information__surname__value title">
            Иванович
            </div>
          </v-col>
        </v-row>
      </v-container>
      -->
      <v-row>
        <v-col class="text-center information__header__h3">
          <h3>
            Личная информация
          </h3>
        </v-col>
      </v-row>
      <v-simple-table class="information__table__1">
        <tbody class="text-center headline font-italic">
        <tr>
          <td class="information__constanta__style">Имя:</td>
          <td class="information__value__style information__customer__name">Иван</td>
          <td class="information__constanta__style">Отчество:</td>
          <td class="information__value__style information__customer__lastname">Иванович</td>
        </tr>
        <tr>
          <td class="information__constanta__style">Фамилия:</td>
          <td class="information__value__style information__customer__surname">Иванов</td>
          <td class="information__constanta__style">Пол:</td>
          <td class="information__value__style information__customer__surname">Мужской</td>
        </tr>
        <tr>
          <td class="information__constanta__style">Дата рождения:</td>
          <td class="information__value__style information__customer__birthday">11.11.11</td>
          <td class="information__constanta__style">Город:</td>
          <td class="information__value__style information__customer__city">Днепр</td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-content>
    <v-footer
      color="green"
      app
    >
      <span class="white--text">Zoocomplex.com.ua</span>
    </v-footer>
  </v-app>
</template>
<style>
  .information__table__1 td {
    max-width: 200px;
  }

  .information__value__style {
    font-weight: 500;
  }

  .information__header__h3 h3 {
    font-size: 24px;
  }

  .information__constanta__style {
  }
</style>

<script>
  export default {
    name: "profile",
    middleware: 'authenticated',
    props: {
      source: String,
    },

    data: () => ({
      drawer: null
    }),
  }
</script>

<style scoped>

</style>
