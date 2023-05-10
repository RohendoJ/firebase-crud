import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditBook = () => {
  const [nameBook, setNameBook] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const validNameBooks = nameBook.length >= 1;
  const validPublisher = publisher.length >= 1;
  const validAuthor = author.length >= 1;
  const validNumberOfPages = numberOfPages.length >= 1;

  const { id } = useParams();
  const navigate = useNavigate();

  const docSnap = doc(db, "books", id);

  const updateBooks = async (e) => {
    e.preventDefault();

    try {
      setIsProcessing(true);
      const newFields = {
        name_book: nameBook,
        publisher: publisher,
        author: author,
        number_of_page: numberOfPages,
      };
      await updateDoc(docSnap, newFields);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await getDoc(docSnap);
        setNameBook(data.data().name_book);
        setPublisher(data.data().publisher);
        setAuthor(data.data().author);
        setNumberOfPages(data.data().number_of_page);
      } catch (error) {
        console.log(error);
      }
    };

    getBooks();
  }, []);

  return (
    <div>
      <form onSubmit={updateBooks}>
        <div className="grid place-items-center min-[350px]:mt-10 mt-10">
          <h1 className="text-teal-500 font-bold text-[2.5rem]">Modify Book</h1>
        </div>
        <h2 className="pl-10 mt-[2rem] mb-2 items-start md:pl-[25vw] lg:pl-[30vw] xl:pl-[35vw] 2xl:pl-[35vw]">
          Nama Buku
        </h2>
        <div className="grid place-items-center">
          <input
            type="text"
            value={nameBook}
            className="w-[80vw] h-[40px] bg-slate-100 rounded pl-3 outline-none focus:outline-teal-300 duration-500 md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[30vw]"
            placeholder="Edit nama buku"
            onChange={(event) => {
              setNameBook(event.target.value);
            }}
            required
          />
        </div>
        <h2 className="pl-10 mt-[1rem] mb-2 items-start md:pl-[25vw] lg:pl-[30vw] xl:pl-[35vw] 2xl:pl-[35vw]">
          Penerbit
        </h2>
        <div className="grid place-items-center">
          <input
            type="text"
            value={publisher}
            className="w-[80vw] h-[40px] bg-slate-100 rounded pl-3 outline-none focus:outline-teal-300 duration-500 md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[30vw]"
            placeholder="Edit penerbit"
            onChange={(event) => {
              setPublisher(event.target.value);
            }}
            required
          />
        </div>
        <h2 className="pl-10 mt-[1rem] mb-2 items-start md:pl-[25vw] lg:pl-[30vw] xl:pl-[35vw] 2xl:pl-[35vw]">
          Penulis
        </h2>
        <div className="grid place-items-center">
          <input
            type="text"
            value={author}
            className="w-[80vw] h-[40px] bg-slate-100 rounded pl-3 outline-none focus:outline-teal-300 duration-500 md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[30vw]"
            placeholder="Edit penulis"
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
            required
          />
        </div>
        <h2 className="pl-10 mt-[1rem] mb-2 items-start md:pl-[25vw] lg:pl-[30vw] xl:pl-[35vw] 2xl:pl-[35vw]">
          Jumlah halaman
        </h2>
        <div className="grid place-items-center">
          <input
            type="number"
            value={numberOfPages}
            className="w-[80vw] h-[40px] bg-slate-100 rounded pl-3 outline-none focus:outline-teal-300 duration-500 md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[30vw]"
            placeholder="Edit jumlah halaman"
            onChange={(event) => {
              setNumberOfPages(event.target.value);
            }}
            min={1}
            required
          />
        </div>
        <div className="flex gap-3 mt-5 justify-end pr-10 md:pr-[25vw] lg:pr-[30vw] xl:pr-[35vw] 2xl:pr-[35vw]">
          <Link to="/" className="text-teal-500 mt-1">
            Cancel
          </Link>
          <button
            className={`bg-teal-500 rounded text-white px-2 py-1 ${
              (!validNameBooks ||
                !validPublisher ||
                !validAuthor ||
                !validNumberOfPages) &&
              "cursor-not-allowed opacity-50"
            } `}
            disabled={
              !validNameBooks ||
              !validPublisher ||
              !validAuthor ||
              !validNumberOfPages
            }
          >
            {isProcessing ? (
              <div className="px-8">
                <FontAwesomeIcon icon="fa-solid fa-circle-notch" spin />
              </div>
            ) : (
              "Add a book"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
