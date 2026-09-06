import { X } from "lucide-react";
import Button from "../common/Button";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactDrawer({ open, setOpen }) {
  const items = ["FOUNDER", "INVESTOR", "PARTNER", "JOURNALIST", "OTHER"];
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-[90]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-[300] h-screen overflow-y-auto hide-scrollbar w-full max-w-[700px] bg-[#dadada] text-black 
           px-12 py-10  rounded-r-[20px] shadow-2xl  transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4"
        >
          <X size={28} className="cursor-pointer" />
        </button>

        {/* heading and image section */}

        <div className=" mb-10 ">
          <h6 className="uppercase text-[60px] leading-15">
            <div className="flex items-center gap-4">
              <span>Talk to</span>

              <img
                src="/image/ContactDrawer/contact-image.webp"
                alt="Background-image"
                className="w-38 h-14 object-cover"
              />
              <span>the</span>
            </div>

            <div> foundry team.</div>
          </h6>
        </div>

        {/* item section */}
        <div>
          <h2 className="text-[11px] font-azeret uppercase">
            I'm a <span className="text-gray-500">[SELECT ONE]</span>
          </h2>
          <div className=" mt-4  flex flex-row gap-4 font-azeret text-[14px] text-gray-500">
            {items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedItem(item)}
                className={`group flex items-center px-2 py-2 cursor-pointer transition-all duration-300 
                  ${selectedItem === item ? "gap-2 bg-white/50" : "hover:bg-white/40 hover:text-black"}`}
              >
                {/* Square */}

                {selectedItem === item && (
                  <div className="w-2.5 h-2.5 rounded-[3px] bg-orange-400"></div>
                )}
                <span
                  className={` transition-colors duration-300 ${selectedItem === item ? "text-orange-500" : ""}  `}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* form section */}
        <div className="pt-8 pb-10 ">
          <form className="text-[14px] flex flex-col ">
            <p className="text-[11px] uppercase">About You</p>
            <div className="mb-8 grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstname"></label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First name"
                  required
                  className="border-b border-black/20 py-2 w-full focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="lastname"></label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last name"
                  required
                  className="border-b border-black/20 py-2 w-full focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="border-b border-black/20 py-2 w-full focus:outline-none"
                />
              </div>

              <div className="relative border-b border-black/20 ">
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  enableSearch={true}
                  countryCodeEditable={false}
                  disableCountryCode={false}
                  placeholder=""
                  containerClass="phone-container"
                  inputClass="phone-input"
                  buttonClass="phone-dropdown"
                />

                {phone === "" && (
                  <span className="phone-placeholder">Phone</span>
                )}
              </div>
            </div>
            <p className="text-[11px] uppercase">Your business</p>
            <div className="">
              <div>
                <label htmlFor="yourbusiness"></label>
                <input
                  type="text"
                  id="yourbusiness"
                  name="yourbusiness"
                  placeholder="Business name"
                  required
                  className="border-b border-black/20 py-4 w-full focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="typeofbusiness"></label>
                <input
                  type="text"
                  id="typeofbusiness"
                  name="typeofbusiness"
                  placeholder="Type of business"
                  required
                  className="border-b border-black/20 py-4 w-full focus:outline-none"
                />
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message (Optional)"
                  className="border-b border-black/20 py-3 w-full bg-transparent resize-none focus:outline-none"
                />
              </div>
            </div>
            <div className=" text-[11px] font-azeret text-gray-500 uppercase pt-6 flex flex-row gap-1">
              <input
                type="checkbox"
                id="privacy"
                required
                className="w-4 h-4 bg-gray-400 cursor-pointer "
              />

              <label htmlFor="privacy">
                By checking this box I agree to the{" "}
                <span className="text-black underline hover:no-underline cursor-pointer">
                  privacy policy
                </span>
              </label>
            </div>
            <div className="pt-10">
              <Button
                padding="px-7 py-3"
                textColor="text-black/80"
                bgColor="bg-black"
                borderColor="border-black"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
