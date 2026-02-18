import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ISI_API_KEY_LU",
  authDomain: "ISI_AUTH_DOMAIN_LU",
  projectId: "ISI_PROJECT_ID_LU",
  storageBucket: "ISI_BUCKET_LU",
  messagingSenderId: "ISI_SENDER_ID_LU",
  appId: "ISI_APP_ID_LU"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
/* ===== KIRIM LAPORAN ===== */
const form = document.getElementById("formLapor");

if(form){
  form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const laporan = document.getElementById("laporan").value;

    await addDoc(collection(db, "laporan"), {
      nama: nama,
      isi: laporan,
      status: "pending"
    });

    document.getElementById("status").innerText = "laporan terkirim!";
    form.reset();
  });
}

/* ===== TAMPILKAN YANG APPROVED SAJA ===== */
const list = document.getElementById("listLaporan");

if(list){
  const q = query(collection(db, "laporan"), where("status", "==", "approved"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc)=>{
    const data = doc.data();
    list.innerHTML += `
      <div>
        <h3>${data.nama}</h3>
        <p>${data.isi}</p>
      </div>
      <hr>
    `;
  });
}
