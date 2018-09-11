import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditComponent } from '../users/edit/edit.component';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<EditComponent> {
    canDeactivate(component: EditComponent) {
        if (component.editForm.dirty) {
            return confirm('Tens a certeza que pretendes continuar sem guardar as modificações?');
        }
        return true;
    }
}