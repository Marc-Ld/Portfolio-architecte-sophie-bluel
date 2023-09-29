const formInfos = document.querySelector("form");


formInfos.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const userInfos = { email, password };
  const authentificationInfos = await fetch(
    "http://localhost:5678/api/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfos),
    }
  );
  const authentificationResponse = await authentificationInfos.json();
  const authentificationToken = authentificationResponse.token;
  const authentificationState = authentificationInfos.ok;

  if (authentificationState === true) {
    sessionStorage.setItem("authentificationToken", authentificationToken);
    window.location.replace("index.html");
  } 
  else {
    const wrongUser = document.querySelector(".wrong-user");
    wrongUser.innerText = "Email ou mot de passe incorrect.";
  }
});