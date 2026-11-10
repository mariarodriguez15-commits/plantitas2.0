import { api } from './api.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('login', () => ({
    form: { correo: '', clave: '' },
    errores: {},       
    errorGeneral: '',  
    enviando: false,   

    validar() {
      const errores = {};
      const correo = this.form.correo.trim();
      if (!correo) errores.correo = 'Ingresa tu correo.';
      else if (!/^\S+@\S+\.\S+$/.test(correo)) errores.correo = 'Ingresa un correo válido.';
      if (!this.form.clave) errores.clave = 'Ingresa tu contraseña.';
      this.errores = errores;
      return Object.keys(errores).length === 0;
    },

    enfocarPrimerError() {
      this.$nextTick(() => document.querySelector('[aria-invalid="true"]')?.focus());
    },

    async enviar() {
      this.errorGeneral = '';
      if (!this.validar()) {
        this.enfocarPrimerError();
        return;
      }

      this.enviando = true;
      let res;
      try {
        res = await api.auth.iniciarSesion({
          correo: this.form.correo.trim(),
          clave: this.form.clave,
        });
      } catch {
        res = { ok: false, error: 'No se pudo completar la solicitud. Intenta de nuevo.' };
      }

      if (res.ok) {
        window.location.href = 'panel.html';
        return;
      }

      this.errores = res.errores ?? {};
      this.errorGeneral = res.error;
      this.enviando = false;
      this.enfocarPrimerError();
    },
  }));
});