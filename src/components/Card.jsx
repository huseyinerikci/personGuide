import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
const Card = ({ user, handleDelete, handleEdit }) => {
  //isim ve soyismin ilk harflerini almak için boşluktan bölme
  const [name, surname] = user.name.split(" ");

  return (
    <div className="card">
      <div className="buttons">
        <button onClick={() => handleEdit(user)}>
          <RiEdit2Fill />
        </button>
        <button onClick={() => handleDelete(user.id)}>
          <RiDeleteBin2Fill />
        </button>
      </div>
      <h1>
        {name[0]} {surname[0]}
      </h1>
      <h3>{user.name}</h3>
      <p>{user.positon}</p>
      <p>{user.company}</p>

      <div className="bottom">
        <div>
          <span>
            <FaPhone />
          </span>
          <span>{user.phone}</span>
        </div>
        <div>
          <span>
            <MdEmail />
          </span>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
