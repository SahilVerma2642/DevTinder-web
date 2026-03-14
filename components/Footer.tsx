import { useState, useEffect } from 'react';

export default function ScrollFooter() {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Get viewport height and scroll position
            const innerHeight = window.innerHeight;
            const scrollTop = document.documentElement.scrollTop;
            // Get full document height
            const offsetHeight = document.documentElement.offsetHeight;
            // Check if scrolled to (or beyond) bottom (allowing small threshold)
            const isBottom = (innerHeight + scrollTop) >= (offsetHeight - 2);
            setShowFooter(isBottom);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();  // initial check in case content is short
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer
            className={`relative bottom-0 left-0 w-full bg-gray-800 text-white p-4 transition mt-auto
                  ${showFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="footer sm:footer-horizontal bg-base-200 text-base-content p-6 md:p-10 shadow-lg">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>

                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>

                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>

                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="w-72 md:w-80">
                        <label className="sr-only">Enter your email address</label>
                        <div className="join">
                            <input
                                type="email"
                                placeholder="username@site.com"
                                className="input input-bordered join-item"
                            />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </footer>
    );
}
