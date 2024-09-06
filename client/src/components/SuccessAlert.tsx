function SuccessAlert(successMessage: string) {
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {successMessage}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default SuccessAlert;
