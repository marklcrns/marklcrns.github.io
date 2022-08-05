grecaptcha.ready(function() {
    grecaptcha.execute('6Lef-U0hAAAAALGyMKkXIfsk04bRgjXo2FRkYfhI', {action: 'homepage'})
    .then(function(token) {
      document.getElementById('captchaResponse').value = token;
    });
  });
