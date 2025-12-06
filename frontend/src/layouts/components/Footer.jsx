

function Footer() {

    const fechaActual = new Date().getFullYear();
    const nombreEmpresa = "Netspace";

    return (
        <footer className="text-gray-500 py-8 pt-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4">
                        <h6 className="font-semibold text-white">Company</h6>
                        <ul className="mt-4">
                            <li className="mt-2"><a href="#" className="hover:underline">About Us</a></li>
                            <li className="mt-2"><a href="#" className="hover:underline">Careers</a></li>
                            <li className="mt-2"><a href="#" className="hover:underline">Press</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h6 className="font-semibold text-white">Support</h6>
                        <ul className="mt-4">
                            <li className="mt-2"><a href="#" className="hover:underline">Help Center</a></li>
                            <li className="mt-2"><a href="#" className="hover:underline">Contact Us</a></li>
                            <li className="mt-2"><a href="#" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4">
                        <h6 className="font-semibold text-white">Social</h6>
                        <ul className="mt-4">
                            <li className="mt-2"><a href="#" className="hover:underline">Facebook</a></li>
                            <li className="mt-2"><a href="#" className="hover:underline">Twitter</a></li>
                            <li className="mt-2"><a href="#" className="hover:underline">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-4 text-center">
                    <p>&copy; {fechaActual} {nombreEmpresa}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;