import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
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
export class TableComponent implements OnChanges {
    @Input() columns: TableColumn[] = [];
    @Input() data: any[] = [];
    @Input() itemsPerPage: number = 5;
    @Input() total: number = 0;
    @Output() onSort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();
    @Output() onSearch = new EventEmitter<string>();
    @Output() onPageChange = new EventEmitter<{ page: number; pageSize: number }>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<any>;

    displayedColumns: string[] = [];
    filteredData: any[] = [];
    searchTerm: string = '';

    ngOnInit() {
        this.displayedColumns = this.columns.map(col => col.key);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data']) {
            this.filteredData = [...this.data];
            if (this.table) {
                this.table.dataSource = this.filteredData;
            }
        }
    }

    ngAfterViewInit() {
        if (this.table) {
            this.table.dataSource = this.filteredData;
        }
        if (this.paginator) {
            this.paginator.pageIndex = 0; // Initialize to first page
            this.paginator.pageSize = this.itemsPerPage;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.searchTerm = filterValue.trim().toLowerCase();
        this.onSearch.emit(this.searchTerm);
    }

    onSortChange(event: any) {
        const { active, direction } = event;
        this.onSort.emit({ column: active, direction });
    }

    handlePageChange(event: PageEvent) {
        this.onPageChange.emit({
            page: event.pageIndex + 1,
            pageSize: event.pageSize
        });
    }
} 