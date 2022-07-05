

const NavbarComponent = () => {
    return(
        <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "rgba(204, 204, 204, 0.5)", borderRadius: "0px 0px 20px 20px"}}>
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Kantin Kejujuran</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/add-item">Add Item</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/balance">Balance</a>
                </li>
                </ul>
            </div>
          </div>
        </nav>
    )
}

export default NavbarComponent;