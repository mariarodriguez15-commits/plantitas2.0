import { api } from './api.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('registro', () => ({
    form: { nombre: '', correo: '', clave: '', confirmarClave: '' },
    errores: {},       
    errorGeneral: '',  
    exito: '',         
    enviando: false,   

    validar() {
      const errores = {};
      const nombre = this.form.nombre.trim();
      const correo = this.form.correo.trim();

      if (!nombre) errores.nombre = 'Ingresa tu nombre.';
      else if (nombre.length < 2) errores.nombre = 'El nombre debe tener al menos 2 caracteres.';

      if (!correo) errores.correo = 'Ingresa tu correo.';
      else if (!/^\S+@\S+\.\S+$/.test(correo)) errores.correo = 'Ingresa un correo válido.';

      if (!this.form.clave) errores.clave = 'Ingresa una contraseña.';
      else if (this.form.clave.length < 8) errores.clave = 'La contraseña debe tener al menos 8 caracteres.';

      if (!this.form.confirmarClave) errores.confirmarClave = 'Confirma tu contraseña.';
      else if (this.form.confirmarClave !== this.form.clave) errores.confirmarClave = 'Las contraseñas no coinciden.';

      this.errores = errores;
      return Object.keys(errores).length === 0;
    },

    enfocarPrimerError() {
      this.$nextTick(() => document.querySelector('[aria-invalid="true"]')?.focus());
    },

    async enviar() {
      this.errorGeneral = '';
      this.exito = '';
      if (!this.validar()) {
        this.enfocarPrimerError();
        return;
      }

      this.enviando = true;
      let res;
      try {
        res = await api.auth.registrar({
          nombre: this.form.nombre.trim(),
          correo: this.form.correo.trim(),
          clave: this.form.clave,
        });
      } catch {
        res = { ok: false, error: 'No se pudo completar la solicitud. Intenta de nuevo.' };
      }

      if (res.ok) {
        this.exito = '¡Cuenta creada! Entrando a tu panel…';
        setTimeout(() => { window.location.href = 'panel.html'; }, 1200);
        return;
      }

      this.errores = res.errores ?? {};
      this.errorGeneral = res.errores ? '' : res.error;
      this.enviando = false;
      this.enfocarPrimerError();
    },
  }));
});