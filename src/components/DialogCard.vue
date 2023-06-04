<template>
  <v-card>
    <v-card-title>Component Title</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Name" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="E-mail"  required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="success" @click="">
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>