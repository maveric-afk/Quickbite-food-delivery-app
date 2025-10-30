import React,{useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {NavLink,useNavigate} from 'react-router-dom'
import api from '../api/axios'
import toast from "react-hot-toast";
import { useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/help", label: "Help" },

];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user,setUser]=useState({})
  const [loggedIn,setLoggedIn]=useState(false)

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0, y: -12 },
    show: {
      height: "auto",
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 26 },
    },
    exit: { height: 0, opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  useEffect(()=>{
    api.get('/api/user')
    .then((res)=>{
      if(res.data.success){
        setUser(res.data.user)
        setLoggedIn(true);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const navigate=useNavigate();
  const handleLogout=()=>{
    api.get('/api/user/logout')
    .then((res)=>{
      if(res.data.success){
        toast.success(res.data.success);
        navigate('/');
      }
      else{
        toast.error(res.data.error)
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="w-full p-2 bg-black text-white shadow-md sticky top-0 z-50"
    >
      {/* Top bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center"
        >
          <img src="/Quickbite-logo.png" className="h-[5rem] md:h-[7rem] lg:h-[8.5rem] hover:scale-105 duration-300"/>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <motion.div
              key={l.href}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative bg-orange-600 hover:bg-orange-500 px-3 py-1 rounded-xl"
            >
              <NavLink
                to={l.href}
                className="transition-colors duration-200 rounded-sm"
              >
                {l.label}
              </NavLink>
              <motion.span
                variants={{
                  rest: { width: 0, opacity: 0 },
                  hover: { width: "100%", opacity: 1 },
                }}
                transition={{ type: "tween", duration: 0.2 }}
                className="absolute left-0 -bottom-1 h-0.5 bg-orange-600 block"
              />
            </motion.div>
          ))}
          {loggedIn
         ? <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <NavLink
                to='/profile'
              >
               <img src={`${import.meta.env.VITE_API_BASE_URL}/${user.ProfileImg}` || `Dummyavatar.jpg`} alt="profileImage" className="h-10 w-10 rounded-full" />
              </NavLink>
              <motion.span
                variants={{
                  rest: { width: 0, opacity: 0 },
                  hover: { width: "100%", opacity: 1 },
                }}
                transition={{ type: "tween", duration: 0.2 }}
                className="absolute left-0 -bottom-1 h-0.5 bg-orange-600 block"
              />
            </motion.div>
        : <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative bg-orange-600 hover:bg-orange-500 px-3 py-1 rounded-xl"
            >
              <NavLink
                to='/signup'
                className="transition-colors duration-200 rounded-sm"
              >
                Register
              </NavLink>
              <motion.span
                variants={{
                  rest: { width: 0, opacity: 0 },
                  hover: { width: "100%", opacity: 1 },
                }}
                transition={{ type: "tween", duration: 0.2 }}
                className="absolute left-0 -bottom-1 h-0.5 bg-orange-600 block"
              />
            </motion.div>}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={toggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-white absolute top-2 right-2 z-40"
          >
            <span className="sr-only">Open main menu</span>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition-transform ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-transform ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden overflow-hidden bg-black text-white absolute top-4 right-4 z-20"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {loggedIn
              ? <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    to='/profile'
                    onClick={close}
                  >
                   <img src="/Dummyavatar.jpg" alt="profileImage" className="h-10 w-10 mb-4 rounded-full" />
                  </NavLink>
                </motion.div>
                : <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    to='/signup'
                    onClick={close}
                    className="block py-2 rounded-md transition-colors hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    Register
                  </NavLink>
                </motion.div>}
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    to={l.href}
                    onClick={close}
                    className="block py-2 rounded-md transition-colors hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
