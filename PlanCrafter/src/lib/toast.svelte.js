class ToastState {
  message = $state(null);

  show(exerciseName) {
    this.message = exerciseName;
    setTimeout(() => { this.message = null; }, 3000);
  }

  dismiss() {
    this.message = null;
  }
}

export const toast = new ToastState();
