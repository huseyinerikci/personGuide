import { useEffect, useState } from "react";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAdd } from "react-icons/io5";
import Card from "./components/Card";
import Modal from "./components/Modal";

//axios ile baseurl tanımla
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  //Kişi listesini tutan state
  const [users, setUsers] = useState([]);

  //Modal pencerenin açık olup olmadığını kontrol eden state
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Düzenleme işlemi yapılacak olan kullanıcıyı tutan state
  const [editItem, setEditItem] = useState(null);

  //sayfa yüklenmesi ve verileri alması
  useEffect(() => {
    axios
      .get("/contact")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Form gönderilmesi
  const handleSubmit = (e) => {
    //yenilemeyi engelleme
    e.preventDefault();

    //input için arama parametresi değer alma
    const text = e.target[1].value;

    //api'a gönderilecek verileri belirleme
    const params = {
      q: text,
    };

    //inputtan alınan değer sonucu api den veriyi al
    axios.get("/contact", { params }).then((res) => setUsers(res.data));
  };

  //Kişi silme fonksiyonu
  const handleDelete = (id) => {
    //kullanıcı onayı
    const res = confirm("Silme işlemi yapılsın mı?");

    if (res) {
      axios
        .delete(`/contact/${id}`)
        .then(() => {
          const updated = users.filter((user) => user.id !== id);
          setUsers(updated);
        })
        .catch((err) => {
          alert("Hata oluştu ", err);
        });
    }
  };

  //Kişi düzenleme fonksiyonu
  const handleEdit = (user) => {
    //düzenleme işlemi yapılacak kullanıcıyı al
    setEditItem(user);

    //modal'ı aç
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>Rehber</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <button>
              <RiSearchLine />
            </button>
            <input type="text" placeholder="Kişi aratınız..." />
          </form>
          <button className="ns">
            <IoMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>

          <button onClick={() => setIsModalOpen(true)} className="add">
            <span>
              <IoPersonAdd />
            </span>
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>
      {/* Main */}
      <main>
        {users.map((user) => (
          <Card // Kullanıcı bilgilerini görüntülemek için bir bileşen
            key={user.id}
            user={user}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </main>
      {/* Modal */}
      <Modal // Kullanıcı bilgilerini eklemek veya düzenlemek için kullanılan form bileşeni
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setUsers={setUsers}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </div>
  );
}

export default App;
