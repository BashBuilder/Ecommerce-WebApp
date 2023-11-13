export default function Footer() {
  return (
    <footer className="bg-neutral  p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        <div>
          <span className="footer-title">Services</span>
          <p className="link-hover link">Branding</p>
          <p className="link-hover link">Design</p>
          <p className="link-hover link">Marketing</p>
          <p className="link-hover link">Advertisement</p>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <p className="link-hover link">About us</p>
          <p className="link-hover link">Contact</p>
          <p className="link-hover link">Jobs</p>
          <p className="link-hover link">Press kit</p>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <p className="link-hover link">Terms of use</p>
          <p className="link-hover link">Privacy policy</p>
          <p className="link-hover link">Cookie policy</p>
        </div>
      </div>
    </footer>
  );
}
