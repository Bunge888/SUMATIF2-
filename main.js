import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

// ini adalah konfigurasi firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
  authDomain: "insan-cemerlang.firebaseapp.com",
  projectId: "insan-cemerlang",
  storageBucket: "insan-cemerlang.appspot.com",
  messagingSenderId: "579109661574",
  appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahpelanggan(nama, tlpon, alamat) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "PELANGGAN"), {
      nama: nama,
      tlpon: tlpon,
      alamat: alamat 
    })

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data pelanggan')
  } catch (error) {
    // menampilkan pesan gagal
    console.log('gagal menyimpan data pelanggan' + error)
  }
}

export async function ambilDaftarpelanggan() {
  const refDokumen = collection(basisdata, "PELANGGAN");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      tlpon: dokumen.data().tlpon,
      alamat: dokumen.data(). alamat 
    })
  })

  return hasilKueri;
}

export async function hapuspelanggan(id) {
  await deleteDoc(doc(basisdata, "PELANGGAN", id))
}

export async function ubahpelanggan(id, namabaru, tlponbaru, alamatbaru) {
  await updateDoc(
    doc(basisdata, "PELANGGAN", id),
    { nama: namabaru, tlpon: tlponbaru, alamat: alamatbaru }
  )
}

export async function ambilpelanggan(id) {
  const refDokumen = await doc(basisdata, "PELANGGAN", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}