import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://zajtohneourkrqtqtobq.supabase.co";
const supabaseKey = "sb_publishable_jlPvHDt6scrsSn_ERTqkEA_YI--0147"; 

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("lead-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const { error } = await supabase
    .from("leads")
    .insert([{ email }]);

  if (error) {
  alert("Error: " + error.message);
} else {
  alert("Solicitud enviada 🚀");
  form.reset();

  window.location.href = "preguntas.html";
  }
  }
});





