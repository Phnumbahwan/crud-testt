import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent {
    @Input() columns: TableColumn[] = [];
    @Input() data: any[] = [];
    @Input() itemsPerPage: number = 10;
    @Output() onSort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<any>;

    displayedColumns: string[] = [];
    filteredData: any[] = [];
    searchTerm: string = '';

    ngOnInit() {
        this.displayedColumns = this.columns.map(col => col.key);
        this.filteredData = [...this.data];
    }

    ngAfterViewInit() {
        if (this.table) {
            this.table.dataSource = this.filteredData;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.searchTerm = filterValue.trim().toLowerCase();
        this.filteredData = this.data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(this.searchTerm)
            )
        );
        if (this.table) {
            this.table.dataSource = this.filteredData;
        }
    }

    onSortChange(event: any) {
        const { active, direction } = event;
        this.onSort.emit({ column: active, direction });
    }
} 