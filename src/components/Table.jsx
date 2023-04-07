import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

const Table = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const booksCollectionRef = collection(db, "books");

  const getBooks = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const sortedData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.name_book.localeCompare(b.name_book));
      setBooks(sortedData);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteBook = (id) => {
    const docSnap = doc(db, "books", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14dbb4",
      cancelButtonColor: "#E64848",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await deleteDoc(docSnap);
        getBooks();
      }
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[20vh]">
        <FontAwesomeIcon
          icon="fa-solid fa-circle-notch"
          spin
          size="2xl"
          style={{ color: "#14dbb4" }}
        />
      </div>
    );
  }

  return (
    <div>
      <table className="w-[80vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[50vw]">
        <thead>
          <tr className="bg-teal-200 text-black">
            <th className="text-[0.5rem] rounded-tl-md pl-2 md:text-[0.9rem]">
              No
            </th>
            <th className="p-2 md:p-4 text-[0.5rem] md:text-[0.9rem]">
              Nama Buku
            </th>
            <th className="text-[0.5rem] md:text-[0.9rem]">Penerbit</th>
            <th className="text-[0.5rem] md:text-[0.9rem]">Penulis</th>
            <th className="text-[0.5rem] md:text-[0.9rem]">Jumlah Halaman</th>
            <th className="text-[0.5rem] md:text-[0.9rem] rounded-tr-md">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr
                className="text-[0.7rem] bg-slate-50 md:text-[0.9rem]"
                key={book.id}
              >
                <td className="text-center text-[0.5rem] md:text-[0.9rem] md:p-3 rounded-bl-md">
                  {index + 1}
                </td>
                <td className="text-center text-[0.5rem] md:text-[0.9rem] md:p-3 rounded-bl-md">
                  {book.name_book}
                </td>
                <td className="text-center text-[0.5rem] md:text-[0.9rem] md:p-3">
                  {book.publisher}
                </td>
                <td className="text-center text-[0.5rem] md:text-[0.9rem] md:p-3">
                  {book.author}
                </td>
                <td className="text-center text-[0.5rem] md:text-[0.9rem] md:p-3">
                  {book.number_of_page}
                </td>
                <td className="text-center text-[0.5rem] md:text-[0.9rem] md:p-3 rounded-br-md flex justify-center p-2 gap-2">
                  <Link
                    to={`/edit/${book.id}`}
                    className="bg-sky-500 text-white rounded px-1 py-[0.25rem] hover:bg-sky-700 md:px-3 md:py-2"
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-pen-to-square"
                      style={{ color: "#ffffff" }}
                    />
                  </Link>
                  <button
                    className="bg-red-500 text-white md:text-[0.9rem] rounded px-1 py-[0.25rem]  md:px-3 md:py-2 hover:bg-red-700"
                    onClick={() => {
                      deleteBook(book.id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-trash"
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
