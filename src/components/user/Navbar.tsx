import React, { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Login from '../Login'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { fetchAccount, logout } from '../../app/store/accountSlice'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'


const navigation = [
  { name: 'หน้าหลัก', href: '/', current: false },
  { name: 'แพ็กเกจ', href: '/Trip', current: false },
  { name: 'สถานที่ท่องเที่ยวในจังหวัดกาญจนบุรี ', href: '/LocationPage', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')


}



export const loadAccountStorage = () => JSON.parse(localStorage.getItem('account')!);

function Navbar() {
  const dispatch = useAppDispatch();
  const account = loadAccountStorage();
  useEffect(() => {
    dispatch(fetchAccount());

  }, [dispatch]);



  return (
    <React.Fragment>
      <Disclosure as="nav" className="bg-blackThrem  dark:bg-blackThrem ">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://drive.google.com/uc?id=1QMrjbLJOMQXCWPVZH-mdfXqTgpmI_9eb"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://drive.google.com/uc?id=1QMrjbLJOMQXCWPVZH-mdfXqTgpmI_9eb"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-white hover:text-black',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">



                  {/* Profile dropdown */}
                  {account ? <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blueeThrem">
                        <span className="sr-only">เมนู</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={account.image}
                          alt={account.image}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/Profile"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              โปรไฟล์
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>

                          {({ active }) => {
                            if (account.roleName === "ผู้ใช้งาน") {
                              return <></>
                            }
                            return <Link
                              to="/Dashboard"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}

                            >

                              ตั้งค่า
                            </Link>
                          }


                          }
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"#"} onClick={() => Swal.fire({
                                title: 'ออกจากระบบหรือไม่?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3c16e8',
                                cancelButtonColor: '#d33',
                                cancelButtonText: "ยกเลิก",
                                confirmButtonText: 'ตกลง'
                              }).then((result) => {
                                if (result.isConfirmed && dispatch(logout())) {
                                  Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'ออกจากระบบสำเร็จ',
                                    showConfirmButton: false,
                                    timer: 1500
                                  }).then(() => window.location.replace("/cs63/s07/Project-End/"))
                                }
                              }
                              )
                              }
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              ออกจากระบบ
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> : <Login />}

                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </React.Fragment>
  )
}

export default Navbar
