<template>
  <div class="fragment">
    <div class="agreggate">
      <div class="tile">
        <h5>Casos Suspeitos</h5>
        <p>{{ casosSuspeitos }}</p>
      </div>

      <div class="tile">
        <h5>Casos Positivos</h5>
        <p>{{ casosPositivos }}</p>
      </div>

      <div class="tile">
        <h5>Positivos Hospital</h5>
        <p>{{ positivosHospital }}</p>
      </div>

      <div class="tile">
        <h5>Suspeitos Hospital</h5>
        <p>{{ suspeitosHospital }}</p>
      </div>
    </div>

    <div>
      <div class="ui input">
        <label>Data</label>
        <input type="number" v-model="informe.timestamp" />
      </div>

      <div class="ui input">
        <label>Óbitos Suspeitos</label>
        <input type="number" v-model="informe.obitos_suspeitos" />
      </div>

      <div class="ui input">
        <label>Óbitos Positivos</label>
        <input type="number" v-model="informe.obitos_positivos" />
      </div>

      <div class="ui input">
        <label>Óbitos Descartados</label>
        <input type="number" v-model="informe.obitos_descartados" />
      </div>

      <div class="ui input">
        <label>Casos Recuperados</label>
        <input type="number" v-model="informe.casos_recuperados" />
      </div>

      <div class="ui input">
        <label>Casos Positivos em Casa</label>
        <input type="number" v-model="informe.positivo_casa" />
      </div>

      <div class="ui input">
        <label>Casos Suspeitos em Casa</label>
        <input type="number" v-model="informe.suspeitos_casa" />
      </div>

      <div class="ui input">
        <label>Casos Positivos nas Enfermarias de Hospitais Públicos</label>
        <input type="number" v-model="informe.positivo_publico_enfermaria" />
      </div>

      <div class="ui input">
        <label>Casos Positivos nas UTIs de Hospitais Públicos</label>
        <input type="number" v-model="informe.positivo_publico_uti" />
      </div>

      <div class="ui input">
        <label>Casos Positivos nas Enfermarias de Hospitais Privados</label>
        <input type="number" v-model="informe.positivo_privado_enfermaria" />
      </div>

      <div class="ui input">
        <label>Casos Positivos nas UTIs de Hospitais Privados</label>
        <input type="number" v-model="informe.positivo_privado_uti" />
      </div>

      <div class="ui input">
        <label>Casos Suspeitos nas Enfermarias de Hospitais Públicos</label>
        <input type="number" v-model="informe.suspeito_publico_enfermaria" />
      </div>

      <div class="ui input">
        <label>Casos Suspeitos nas UTIs de Hospitais Públicos</label>
        <input type="number" v-model="informe.suspeito_publico_uti" />
      </div>

      <div class="ui input">
        <label>Casos Suspeitos nas Enfermarias de Hospitais Privados</label>
        <input type="number" v-model="informe.suspeito_privado_enfermaria" />
      </div>

      <div class="ui input">
        <label>Casos Suspeitos nas UTIs de Hospitais Privados</label>
        <input type="number" v-model="informe.suspeito_privado_uti" />
      </div>
    </div>
    <div>
      <button @click="salvar" class="ui green button" id="salvar">Salvar Informe</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      informe: {
        timestamp: new Date().getTime(),
        casos_suspeitos: 0,
        obitos_suspeitos: 0,
        casos_positivos: 0,
        obitos_positivos: 0,
        obitos_descartados: 0,
        casos_recuperados: 0,
        positivo_casa: 0,
        positivo_hospital: 0,
        suspeitos_casa: 0,
        suspeitos_hospital: 0,
        positivo_publico_enfermaria: 0,
        positivo_publico_uti: 0,
        positivo_privado_enfermaria: 0,
        positivo_privado_uti: 0,
        suspeito_publico_enfermaria: 0,
        suspeito_publico_uti: 0,
        suspeito_privado_enfermaria: 0,
        suspeito_privado_uti: 0
      }
    };
  },
  computed: {
    casosSuspeitos() {
      return (
        Number(this.informe.obitos_suspeitos) +
        Number(this.informe.suspeitos_casa) +
        this.suspeitosHospital
      );
    },
    positivosHospital() {
      return (
        Number(this.informe.positivo_privado_uti) +
        Number(this.informe.positivo_publico_enfermaria) +
        Number(this.informe.positivo_privado_enfermaria) +
        Number(this.informe.positivo_publico_uti)
      );
    },
    suspeitosHospital() {
      return (
        Number(this.informe.suspeito_publico_enfermaria) +
        Number(this.informe.suspeito_publico_uti) +
        Number(this.informe.suspeito_privado_enfermaria) +
        Number(this.informe.suspeito_privado_uti)
      );
    },
    casosPositivos() {
      return (
        Number(this.informe.positivo_casa) +
        Number(this.informe.obitos_positivos) +
        this.positivosHospital +
        Number(this.informe.casos_recuperados)
      );
    }
  },
  methods: {
    async salvar() {
      document.querySelector("#salvar").classList.add("loading");

      this.informe.casos_suspeitos = this.casosSuspeitos;
      this.informe.casos_positivos = this.casosPositivos;
      this.informe.positivo_hospital = this.positivosHospital;
      this.informe.suspeitos_hospital = this.suspeitosHospital;
      console.log(this.informe);

      const res = await axios.post(
        "https://covid19-sjc-api.herokuapp.com/informe",
        this.informe
      );

      //   const res = await axios.post(
      //     "http://localhost:5000/informe",
      //     this.informe
      //   );

      if (res.status === 201)
        document.querySelector("#salvar").classList.remove("loading");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.fragment {
  display: grid;
  grid-template-columns: 1fr 1fr 200px;
}

.ui.input {
  display: flex;
  flex-direction: column;
  margin: 5px;
}

label {
  text-align: start;
}

.tile {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 300px;
  margin-bottom: 20px;
}

.tile h5,
.tile p {
  padding: 10px;
}

.tile p {
  font-size: 24px;
  padding-top: 0;
  margin-bottom: 20px;
}

.agreggate {
  margin: 0 auto;
}

.fragment {
  margin-right: 0;
}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/

@media (min-width: 320px) and (max-width: 480px) {
  .fragment {
    display: flex;
    flex-direction: column;
  }

  .fragment div {
    margin: 20px;
  }
}
</style>
