grecaptcha.ready(function() {
    grecaptcha.execute('6Lef-U0hAAAAABF2TRjRoMoK0FcPfhjVyDAakTLe', {action: 'homepage'})
    .then(function(token) {
      document.getElementById('captchaResponse').value = token;
    });
  });
