import React from 'react';

function Footer() {
    return (
        <footer className="py-4 bg-dark border-top border-danger text-white mt-auto">
            <div className="container-fluid px-md-5 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <p className="small mb-0 text-white-50">
                    © Santa Mila SPA - Punta Arenas
                </p>
                <div className="d-flex align-items-center gap-3">
                    <span className="small text-white-50 fw-semibold">Síguenos en nuestras redes:</span>
                    <div className="d-flex gap-2">
                        <a
                            href="https://www.instagram.com/santamila.puq/"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-light px-3 rounded-pill fw-bold"
                            style={{ fontSize: '0.75rem' }}
                        >
                            Instagram
                        </a>
                        <a
                            href="https://wa.me/56982556888"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-success px-3 rounded-pill fw-bold text-success"
                            style={{ fontSize: '0.75rem', borderColor: '#198754' }}
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;