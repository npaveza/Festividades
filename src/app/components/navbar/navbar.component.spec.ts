import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create a more complete Router spy
    const spy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl'], {
      events: of(null),
      url: '/current-url',
      routerState: {
        snapshot: {
          root: {}
        }
      },
      parseUrl: (url: string) => ({ segments: [] }),
      createUrlTree: () => ({ segments: [] }),
      serializeUrl: () => 'serialized-url'
    });

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NavbarComponent
      ],
      providers: [
        { 
          provide: Router, 
          useValue: spy 
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: new Map(),
              queryParamMap: new Map()
            },
            url: of([]),
            fragment: of(null),
            routeConfig: null,
            root: {},
            parent: null,
            firstChild: null,
            children: []
          }
        }
      ],
    }).compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});