function togglePwd() {
  const input = document.getElementById('pwd');
  input.type = input.type === 'password' ? 'text' : 'password';
}