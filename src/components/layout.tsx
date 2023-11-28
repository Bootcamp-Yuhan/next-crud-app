import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <div className="container px-4">
          <a className="navbar-brand" href="#page-top">POS APP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" href="/pos/category">Category</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/pos/variant">Variant</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/pos/product">Product</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/pos/order">Order</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="py-5 bg-dark">
        <div className="container px-4"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
      </footer>
    </>
  )
}