'use client';
import React, { FormEvent, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { addUserEMailToProduct } from '@/lib/actions';
interface Props {
  productId: string;
}
const Modal = ({productId}:Props) => {
  let [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setIsLoading(true);

    //   add user email to product;
    await addUserEMailToProduct(productId,email);
    setIsLoading(false)
    setEmail('')
    closeModal()
  }
  return (
    <>
      <button className="btn" onClick={openModal} type="button">
        Track
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container">
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100 duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
        <span className="inline-block h-screen align-middle" aria-hidden={true} ></span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
                <div className="dialog-content">
                    <div className="flex flex-col ">
                        <div className="flex justify-between ">
                            <div className="p-3 border border-gray-200 rounded-10">
                                <Image src='/assets/icons/logo.svg' alt='logo' width={28} height={28}  />
                            </div>
                            <Image src='/assets/icons/x-close.svg' alt='close' width={24} height={24} className='cursor-pointer' onClick={closeModal} />
                        </div>
                        <h4 className="dialog-head_text">Stay updated with product pricing alerts right in your inbox!</h4>
                        <p className="text-sm text-gray-600 mt-24">Never miss a bargain again with our timely alerts!</p>

                    </div>
                    <form action="" onSubmit={handleSubmit} className='flex flex-col mt-5' >
                        <label htmlFor="email" className='text-sm font-semibold text-gray-700' >
                            Email address
                        </label>
                        <div className="dialog-input_container">
                            <Image src='/assets/icons/mail.svg' width={18} height={18} alt='mail'/>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required  id='email' placeholder='Enter your email eddress' className='dialog-input' />
                        </div>
                        <button type='submit' className="dialog-btn">{isLoading?'Submiting...':'Submit'}</button>
                    </form>
                </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
