import { IoMdClose } from "react-icons/io";
import Field from "./Field";
import axios from "axios";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  setUsers,
  editItem,
  setEditItem,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    //form elemanlarına eriş
    const formData = new FormData(e.target);

    //erişilen formdaki değerleri önce diziye çevirme sonra obje elde etme
    const newUser = Object.fromEntries(formData.entries());

    //kişinin id sini atama (yeni kişi ise yeni id, mevcut kişi ise id sini korumak)
    if (!editItem) {
      newUser.id = Date.now();
    } else {
      newUser.id = editItem.id;
    }

    //Api'e Kişi Ekleme
    if (!editItem) {
      axios
        .post("/contact", newUser)
        .then(() => {
          setUsers((users) => [...users, newUser]);
        })
        .catch((err) => {
          console.log(`Hata: ${err}`);
        });
    } else {
      //Api'e Kişi Güncelleme
      axios
        .put(`/contact/${editItem.id}`, newUser)
        .then(() => {
          setUsers((users) =>
            users.map((user) => (user.id === editItem.id ? newUser : user))
          );
        })
        .catch((err) => {
          console.log(err);
        });
      //güncelleme tamamlandığında editItem (düzenleme modu) sıfırla
      setEditItem(null);
    }

    setIsModalOpen(false);
  };

  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h2>{editItem ? "Kişi Güncelleme" : "Yeni Kişi Ekle"}</h2>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditItem(null);
              }}
            >
              <IoMdClose />
            </button>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="İsim Soyisim" name="name" />
            <Field value={editItem?.positon} label="Pozisyon" name="positon" />
            <Field value={editItem?.company} label="Şirket" name="company" />
            <Field value={editItem?.phone} label="Telefon" name="phone" />
            <Field value={editItem?.email} label="Mail" name="email" />
            <div className="buttons">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditItem(null);
                }}
                type="button"
              >
                Vazgeç
              </button>
              <button type="submit">{editItem ? "Güncelle" : "Ekle"}</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
