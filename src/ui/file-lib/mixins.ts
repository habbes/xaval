export class NameUpdatable {
    nameEl: HTMLInputElement;
    name: string;
    onNameChanged (handler: (newName: string) => any) {
        this.nameEl.addEventListener('change', () => {
            const newName = this.nameEl.value;
            if (newName !== this.name) {
                handler(newName);
            }
        });
    }
}